from __future__ import unicode_literals
from django.utils import timezone
from django.db import models


def one_day_from_now():
    return timezone.now() + timezone.timedelta(days=1)

def one_year_from_now():
    return timezone.now() + timezone.timedelta(days=365)

# Create your models here.
class Issue(models.Model):
    issue_name = models.CharField(max_length=200)
    until= models.DateTimeField(default=one_year_from_now)
    def __unicode__(self):
        return self.issue_name

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


class Contact(models.Model):
    name = models.CharField(max_length=200)
    address1 = models.CharField(max_length=250)
    address2 = models.CharField(max_length=250)
    address3 = models.CharField(max_length=250)
    zipcode =  models.CharField(max_length=10)
    emails = models.CharField(max_length=500)
    phone = models.CharField(max_length=250)
    fax = models.CharField(max_length=250)

class Location(models.Model):
    zipcode= models.CharField(max_length=10)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)

class Representation(models.Model):
    until=  models.DateTimeField(default=one_day_from_now)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, null=True)
    contact = models.ForeignKey(Contact, on_delete=models.CASCADE, null=True)
    role = models.CharField(max_length=150, default="Representative")
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, null=True)


class Template(models.Model):
    LEVEL_CHOICES = (
        ('federal', 'Federal'),
        ('state', 'State'),
        ('city', 'City'),
    )
    content= models.TextField()
    until= models.DateTimeField(default=one_year_from_now)
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE, null=True, blank=True)
    state = models.ForeignKey(State, on_delete=models.CASCADE, null=True, blank=True)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES, default="city")
    def __unicode__(self):
        safe_issue = self.issue.issue_name if self.issue else ""
        safe_city = self.city.name if self.city else ""
        safe_state = self.state.name if self.state else ""
        safe_level = self.level
        return safe_issue + " / " + safe_level + " / " + safe_city + " / " + safe_state
