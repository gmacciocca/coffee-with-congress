from cwc import models
import copy

def get_or_save(contact):

    # every contact is saved (for template limiting feature)
    try:
        result = models.Contact.objects.get(name=contact['name'])
    except models.Contact.DoesNotExist:
        result = models.Contact()
        result.update_from_normalized(contact)
        print repr(result.for_export())
        result.save()

    # and if information is updated in database (and override is set)
    # then the API returned contact will be replaced with
    # database one
    if result.override:
        return result.for_export()
    else:
        return contact

'''
    Returns updated contacts from the database (if overriden)
    and saves nonexistent contacts to the database
'''
def correct_info(contacts):
    results = copy.deepcopy(contacts)
    for contact in (results['federal'] + results['city'] + results['state']):
        database_contact = get_or_save(contact)
        contact.update(database_contact)
    return results

def filter_disabled(contacts_list):
    disabled_roles = [ role.name for role in models.Role.objects.filter(do_not_display_in_contacts=True)]
    return [contact for contact in contacts_list if contact.get('role','') not in disabled_roles]

def exclude_disabled(contacts):
    return {
        'federal': filter_disabled(contacts['federal']),
        'state': filter_disabled(contacts['state']),
        'city': filter_disabled(contacts['city'])
    }
