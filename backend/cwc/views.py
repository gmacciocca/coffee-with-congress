from django.http import JsonResponse
from django.http import HttpResponseNotFound
from cwc import models
from django.utils import timezone
from apiclient.discovery import build
from cwc import settings
from cwc.clients import CivicApi

def index(request):
    return JsonResponse("Hello, cofee with congress. You are at index.")

def get_issues(request):
    issues = [issue.for_export() for issue in models.Issue.objects.filter(until__gte=timezone.now())]
    return JsonResponse(issues, safe=False)

def get_contacts(request):
    api = CivicApi()
    api.build()
    address = request.GET['address']
    contacts = api.contactsForAddress(address)
    return JsonResponse(contacts, safe=False)

def get_template(request, issue_id, state, level):
    try:
        state = models.State.objects.get(code=state)
        issue = models.Issue.objects.get(id=issue_id)
        template = models.Template.objects.get(issue_id=issue.id, state_id=state.id, level=level)
        return JsonResponse(template.for_export(),safe=False)
    except (models.Template.DoesNotExist, models.Issue.DoesNotExist, models.State.DoesNotExist):
        return HttpResponseNotFound('<h1>Template not found</h1>')
