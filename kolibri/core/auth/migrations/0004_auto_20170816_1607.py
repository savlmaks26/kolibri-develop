# -*- coding: utf-8 -*-
# Generated by Django 1.9.7 on 2017-08-16 23:07
from __future__ import unicode_literals

from django.db import migrations

from kolibri.core.auth.constants.role_kinds import ADMIN


class Migration(migrations.Migration):

    dependencies = [
        ("kolibriauth", "0003_auto_20170621_0958"),
        ("device", "0001_initial"),
    ]

    operations = []  # no operations to perform, kept for consistency