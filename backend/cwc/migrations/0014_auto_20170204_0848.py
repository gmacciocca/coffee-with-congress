# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-02-04 08:48
from __future__ import unicode_literals

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0013_issue_ordinal'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='issue',
            options={'ordering': ['ordinal', 'id']},
        ),
    ]
