from cwc import models
import copy

def get_or_save(contact):

    # every contact is saved (for template limiting feature)
    try:
        result = model.Contact.objects.get(name=contact['name'])
    except model.Contact.DoesNotExist:
        result = model.Contact()
        result.update_from_normalized(contact)
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
