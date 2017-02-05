# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-05 06:41
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion

first_group = 1

def initialize_first_group(apps, schema_editor):
    IssueGroup = apps.get_model("cwc", "IssueGroup")
    first_group = IssueGroup.objects.first().id

class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0017_issuegroup'),
    ]

    operations = [
        migrations.RunPython(initialize_first_group),
        migrations.AlterModelOptions(
            name='issuegroup',
            options={'ordering': ['ordinal', 'id']},
        ),
        migrations.AddField(
            model_name='issue',
            name='issue_group',
            field=models.ForeignKey(default=first_group, on_delete=django.db.models.deletion.CASCADE, to='cwc.IssueGroup'),
        ),
    ]
