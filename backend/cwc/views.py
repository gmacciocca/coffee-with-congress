from django.http import JsonResponse
from django.http import HttpResponseNotFound
from django.http import HttpResponseBadRequest
from cwc import models
from django.utils import timezone
from apiclient.discovery import build
from cwc import settings
from cwc.clients import CivicApi
from cwc.transform import correct_info, exclude_disabled
import sys
import json

def index(request):
    return JsonResponse("Hello, cofee with congress. You are at index.")

def get_issues(request):
    issues = [issue.for_export() for issue in models.Issue.objects.filter(until__gte=timezone.now())]
    return JsonResponse(issues, safe=False)

def get_issues_for_state(request,state):
    issues_for_state = models.Issue.objects.filter(until__gte=timezone.now(),template__states__code=state)
    issues = [issue.for_export() for issue in issues_for_state]
    return JsonResponse(issues, safe=False)

def get_issue_groups_for_state(request, state):
    issue_groups_for_state = models.IssueGroup.objects.filter(issue__template__states__code=state)
    issue_groups = [issue_group.for_export(state) for issue_group in issue_groups_for_state]
    return JsonResponse(issue_groups,safe=False)

def get_contacts(request):
    api = CivicApi()
    api.build()
    address = request.GET['address']
    contacts = api.contactsForAddress(address)
    correct_contacts = correct_info(contacts)
    return JsonResponse(correct_contacts, safe=False)

def get_all_contacts(request):
    api = CivicApi()
    api.build()
    address = request.GET['address']
    contacts = api.unfilteredContactsForAddress(address)
    correct_contacts = exclude_disabled(correct_info(contacts))
    return JsonResponse(correct_contacts, safe=False)

def get_template(request, issue_id, state, level):
    try:
        state = models.State.objects.get(code=state)
        issue = models.Issue.objects.get(id=issue_id)
        template = models.Template.objects.get(issue_id=issue.id, states__in=[state.id], level=level)
        return JsonResponse(template.for_export(),safe=False)
    except (models.Template.DoesNotExist, models.Issue.DoesNotExist, models.State.DoesNotExist):
        return HttpResponseNotFound('<h1>Template not found</h1>')


'''
   Returns template by trying to find one specific to contact first,
   then role, and then the one not tied to particular contact or role.
   404 if any of the crucial information cannot be found.
'''
def get_template_for_contact_and_role(request, issue_id, state, level, role_name, contact_name):
    try:
        state = models.State.objects.get(code=state)
        issue = models.Issue.objects.get(id=issue_id)
        role  = models.Role.objects.get(name=role_name)
        contact = models.Contact.objects.get(name=contact_name)
        template_for_contact = models.Template.objects.filter(issue_id=issue.id, states__in=[state.id], level=level, contact_id=contact.id)
        template_for_role = models.Template.objects.filter(issue_id=issue.id, states__in=[state.id], level=level, role_id=role.id, contact_id = None)
        template_general = models.Template.objects.filter(issue_id=issue.id, states__in=[state.id], level=level)

        all_templates = [template_for_contact.first(), template_for_role.first(), template_general.first()]

        template = [t for t in all_templates if t is not None][0]

        return JsonResponse(template.for_export(),safe=False)
    except (models.Template.DoesNotExist, models.Issue.DoesNotExist, models.State.DoesNotExist,models.Contact.DoesNotExist, models.Role.DoesNotExist, IndexError):
        print sys.exc_info()
        return HttpResponseNotFound('<h1>Template not found</h1>')

def stats(request):
    if request.method == 'POST':
        json_data = json.loads(request.body)
        try:
            issue_id = json_data['issue']
            state_code = json_data['state']
            level = json_data['level']
            printed_letter = models.PrintedLetter(issue_id = issue_id, state_code= state_code, level=level)
            printed_letter.save()
        except KeyError:
            return HttpResponseBadRequest("Malformed data!")
    else:
        count = models.PrintedLetter.objects.count()
        return JsonResponse({
          "letter_count": count
        })
    return JsonResponse("OK", safe=False, status=201)
