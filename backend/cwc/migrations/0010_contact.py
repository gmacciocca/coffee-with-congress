# -*- coding: utf-8 -*-
# Generated by Django 1.10.3 on 2017-01-28 05:27
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cwc', '0009_auto_20170122_1230'),
    ]

    operations = [
        migrations.CreateModel(
            name='Contact',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(db_index=True, max_length=200)),
                ('address1', models.CharField(max_length=250)),
                ('address2', models.CharField(max_length=250)),
                ('city', models.CharField(max_length=250)),
                ('state', models.CharField(max_length=250)),
                ('zip_code', models.CharField(max_length=10)),
                ('emails', models.CharField(max_length=500)),
                ('phone', models.CharField(max_length=250)),
                ('fax', models.CharField(max_length=250)),
                ('override', models.BooleanField(default=False)),
                ('role', models.CharField(max_length=250)),
                ('party', models.CharField(max_length=250)),
            ],
        ),
    ]
