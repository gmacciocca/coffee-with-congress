# Copyright 2015 Google Inc. All rights reserved.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from django.conf.urls import include, url
from django.contrib import admin

from cwc import views

# order is important ! more specific routes must precede general routes
urlpatterns = [
    url(r'^$', views.index),
    url(r'^issue_groups/state/(?P<state>[A-Za-z]{0,3})', views.get_issue_groups_for_state),
    url(r'^issues/state/(?P<state>[A-Za-z]{0,3})', views.get_issues_for_state),
    url(r'^issues', views.get_issues),
    url(r'^contacts', views.get_contacts),
    url(r'^template/issue/(?P<issue_id>\d+)/state/(?P<state>[A-Za-z]{0,3})/level/(?P<level>(federal|state|city))/role/[A-Za-z\.\'\s]+/contact/[A-Za-z\.\'\s]+$', views.get_template_for_contact_and_role),
    url(r'^template/issue/(?P<issue_id>\d+)/state/(?P<state>[A-Za-z]{0,3})/level/(?P<level>(federal|state|city))$', views.get_template),
    url(r'^admin/', include(admin.site.urls)),
    url(r'^stats', views.stats),
]
