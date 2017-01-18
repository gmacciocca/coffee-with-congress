from __future__ import unicode_literals
from django.utils import timezone
from django.db import models


LEVEL_CHOICES = (
    ('federal', 'Federal'),
    ('state', 'State'),
    ('city', 'City'),
)

def one_day_from_now():
    return timezone.now() + timezone.timedelta(days=1)

def one_year_from_now():
    return timezone.now() + timezone.timedelta(days=365)

# Create your models here.
class Issue(models.Model):
    issue_name = models.CharField(max_length=200)
    until= models.DateTimeField(default=one_year_from_now)
    def __unicode__(self):
        return str(self.id) + ' - ' + self.issue_name

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

class Template(models.Model):
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

    def for_export(self):
        return {
          'id': self.id,
          'content': self.content
        }

class PrintedLetter(models.Model):
    when = models.DateTimeField(default=timezone.now)
    level = models.CharField(max_length=10, choices=LEVEL_CHOICES, default="city")
    issue = models.ForeignKey(Issue, on_delete=models.CASCADE, null=True)
    state_code = models.CharField(max_length=3)
