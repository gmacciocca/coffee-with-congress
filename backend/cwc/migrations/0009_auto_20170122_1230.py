# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-22 12:30
from __future__ import unicode_literals

from django.db import migrations, models

template_states = {}

def pull_template_states(apps, schema_editor):
    # We can't import the Template model directly as it may be a newer
    # version than this migration expects. We use the historical version.
    Template = apps.get_model("cwc", "Template")
    for template in Template.objects.all():
        ts = template_states.get(template.level, None)
        if ts is None:
            ts = template_states[template.level] = {}

        ti = ts.get(template.issue_id, None)
        delete_template = True
        if ti is None:
            ti = ts[template.issue_id] = []
            delete_template = False

        ti.append(template.state)
        if delete_template:
            template.delete()

def push_template_states(apps, schema_editor):

    Template = apps.get_model("cwc", "Template")
    for template in Template.objects.all():
        states = template_states[template.level][template.issue_id]
        for state in states
            template.states.append(state)
        template.save()

class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0008_auto_20170102_0807'),
    ]

    operations = [
        migrations.RunPython(pull_template_states),
        migrations.RemoveField(
            model_name='template',
            name='state',
        ),
        migrations.AddField(
            model_name='template',
            name='states',
            field=models.ManyToManyField(to='cwc.State'),
        ),
        migrations.RunPython(push_template_states)
    ]
