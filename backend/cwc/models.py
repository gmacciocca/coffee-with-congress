from __future__ import unicode_literals
from django.utils import timezone
from django.db import models

LEVEL_CHOICES = (
    ('federal', 'Federal'),
    ('state', 'State'),
    ('city', 'City'),
)

def xstr(s):
    return '' if s is None else str(s)

def one_day_from_now():
    return timezone.now() + timezone.timedelta(days=1)

def one_year_from_now():
    return timezone.now() + timezone.timedelta(days=365)

END_OF_THE_LIST=900000

# Create your models here.
class Issue(models.Model):
    issue_name = models.CharField(max_length=200)
    until= models.DateTimeField(default=one_year_from_now)
    ordinal=models.PositiveIntegerField(default=END_OF_THE_LIST,null=False)

    class Meta:
        ordering = ['ordinal','id']

    def __unicode__(self):
        return str(self.id) + ' - ' + self.issue_name + ' (' +  str(self.ordinal)  +  '.)'

    def for_export(self):
        return {
          'id': self.id,
          'name': self.issue_name
        }

class State(models.Model):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=3)
    def __unicode__(self):
        return self.name + ' ' + self.code

class City(models.Model):
    name = models.CharField(max_length=150)
    state = models.ForeignKey(State, on_delete=models.CASCADE, null=True)
    def __unicode__(self):
        return self.name

class Source(models.Model):
    title = models.CharField(null=False, max_length=500)
    url = models.URLField(null=True)
    ordinal=models.PositiveIntegerField(default=END_OF_THE_LIST,null=False)

    def __unicode__(self):
        return str(self.id) + " - " + self.title

    def for_export(self):
        return { 'title': self.title, 'url': self.url }

    class Meta:
        ordering = ['ordinal','id']

class Template(models.Model):
    content= models.TextField()
    until= models.DateTimeField(default=one_year_from_now)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    states = models.ManyToManyField(State)
    sources = models.ManyToManyField(Source)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES, default="city")

    def duplicates(self):
        state_ids = [state.id for state in self.states.all()]
        duplicate_objects = Template.objects.filter(level=self.level, issue_id = self.issue_id, states__in=state_ids).exclude(id=self.id)
        return [str(duplicate.id) for duplicate in duplicate_objects]

    def __unicode__(self):
        safe_issue = self.issue.issue_name if self.issue else ""
        safe_city = self.city.name if self.city else ""
        safe_state = ",".join([state.code for state in self.states.all()])
        #self.state.name if self.state else ""
        safe_level = self.level
        duplicates = self.duplicates()
        safe_duplicates = "" if duplicates == [] else " / HAS DUPLICATES "
        return safe_issue + " / " + safe_level + " / " + safe_city + " / " + safe_state + safe_duplicates

    def for_export(self):
        sources = [ source.for_export() for source in self.sources.all() ]
        return {
          'id': self.id,
          'content': self.content,
          'sources': sources
        }


class PrintedLetter(models.Model):
    when = models.DateTimeField(default=timezone.now)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES, default="city")
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True)
    state_code = models.CharField(max_length=3)

class Contact(models.Model):
    name = models.CharField(db_index=True, max_length=200)
    address1 = models.CharField(max_length=250)
    address2 = models.CharField(null=True,blank=True, max_length=250)
    city = models.CharField(max_length=250)
    state = models.CharField(max_length=250)
    zip_code =  models.CharField(max_length=10)
    emails = models.CharField(null=True, blank=True,max_length=500)
    phone = models.CharField(null=True,blank=True, max_length=250)
    fax = models.CharField(null=True,blank=True, max_length=250)
    override = models.BooleanField(default=False)
    role = models.CharField(null=True,blank=True, max_length=250)
    party = models.CharField(null=True,blank=True, max_length=250)

    def __unicode__(self):
        return self.name

    def for_export(self):
        return {
            "id": self.id,
            "name": self.name,
            "address1": self.address1,
            "address2": self.address2,
            "city": self.city,
            "state": self.state,
            "zip_code": self.zip_code,
            "phones": self.phone.split(','),
            "faxes": self.fax.split(','), # no data from civic api
            "emails": self.emails.split(','), # no data from civic api
            "role": self.role,
            "party": self.party,
            "override": self.override,
        }

    def update_from_normalized(self,contact):
        self.name = xstr(contact.get('name', ''))
        self.address1 = xstr(contact.get('address1', ''))
        self.address2 = xstr(contact.get('address2', ''))
        self.city = xstr(contact.get('city',''))
        self.state = xstr(contact.get('state',''))
        self.zip_code = xstr(contact.get('zip_code',''))
        self.phone = xstr(",".join(contact.get('phones', [])))
        self.fax = xstr(",".join(contact.get('faxes', [])))
        self.emails = xstr(",".join(contact.get('emails',[])))
        self.role = xstr(contact.get('role',''))
        self.party = xstr(contact.get('party',''))
