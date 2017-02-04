from django.http import JsonResponse
from django.http import HttpResponseNotFound
from django.http import HttpResponseBadRequest
from cwc import models
from django.utils import timezone
from apiclient.discovery import build
from cwc import settings
from cwc.clients import CivicApi
from cwc.transform import correct_info
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

def get_contacts(request):
    api = CivicApi()
    api.build()
    address = request.GET['address']
    contacts = api.contactsForAddress(address)
    correct_contacts = correct_info(contacts)
    return JsonResponse(correct_contacts, safe=False)

def get_template(request, issue_id, state, level):
    try:
        state = models.State.objects.get(code=state)
        issue = models.Issue.objects.get(id=issue_id)
        template = models.Template.objects.get(issue_id=issue.id, states__in=[state.id], level=level)
        return JsonResponse(template.for_export(),safe=False)
    except (models.Template.DoesNotExist, models.Issue.DoesNotExist, models.State.DoesNotExist):
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
