# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-05 06:34
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    def create_at_least_one_group(apps, schema_editor):
        IssueGroup = apps.get_model("cwc", "IssueGroup")
        if IssueGroup.objects.count() <= 0:
            ig = IssueGroup()
            ig.name = "Other"
            ig.save();

    dependencies = [
        ('cwc', '0016_auto_20170205_0605'),
    ]

    operations = [
        migrations.CreateModel(
            name='IssueGroup',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=150)),
                ('ordinal', models.PositiveIntegerField(default=900000)),
            ],
        ),
        migrations.RunPython(create_at_least_one_group)
    ]
