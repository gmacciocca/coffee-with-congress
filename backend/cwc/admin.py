from django.contrib import admin
from cwc import models

# Register your models here.
admin.site.register(models.Issue)
admin.site.register(models.Template)
admin.site.register(models.State)
admin.site.register(models.City)
admin.site.register(models.Contact)
admin.site.register(models.Source)
admin.site.register(models.IssueGroup)
admin.site.register(models.Role)
