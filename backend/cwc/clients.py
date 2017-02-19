from cwc import settings
from apiclient.discovery import build


class CivicApi:

    service=None
    representatives=None

    def build(self):
        self.service = build('civicinfo', 'v2', developerKey=settings.CIVIC_API_KEY)
        self.representatives = self.service.representatives()

    def contactsForAddress(self, address):


        response = self.representatives.representativeInfoByAddress(levels=None, roles=["headOfState","headOfGovernment","deputyHeadOfGovernment","governmentOfficer","legislatorUpperBody","legislatorLowerBody"], address=address).execute()


        federal_contact_indices = sum([office['officialIndices'] for office in response['offices'] if ('country' in office['levels'])], [])
        state_contact_indices = sum([office['officialIndices'] for office in response['offices'] if ('administrativeArea1' in office['levels'])], [])
        city_contact_indices = sum([office['officialIndices'] for office in response['offices'] if ('administrativeArea2' in office['levels'])], [])

        result = {}
        result['federal'] = [ self.normalized_contact(response,index) for index in federal_contact_indices  ]
        result['state'] = [ self.normalized_contact(response, index) for index in state_contact_indices  ]
        result['city'] = [ self.normalized_contact(response, index) for index in city_contact_indices  ]

        return result

    def unfilteredContactsForAddress(self, address):
       # roles=["headOfState","headOfGovernment","deputyHeadOfGovernment","governmentOfficer","legislatorUpperBody","legislatorLowerBody"],
        response = self.representatives.representativeInfoByAddress(levels=None, address=address).execute()

        federal_contact_indices = sum([office['officialIndices'] for office in response['offices'] if ('country' in office.get('levels',[]))], [])
        state_contact_indices = sum([office['officialIndices'] for office in response['offices'] if ('administrativeArea1' in office.get('levels',[]))], [])


        def is_city_level(existing_indices, office):
            return set(office['officialIndices']).intersection(set(existing_indices)) == set([])

        city_contact_indices = sum([office['officialIndices'] for office in response['offices'] if (is_city_level(federal_contact_indices + state_contact_indices, office))],[])

        result = {}
        result['federal'] = [ self.normalized_contact(response,index) for index in federal_contact_indices  ]
        result['state'] = [ self.normalized_contact(response, index) for index in state_contact_indices  ]
        result['city'] = [ self.normalized_contact(response, index) for index in city_contact_indices  ]

        return result


    """
      Example of input contact:

       { u'address': [ { u'city': u'Albany',
                                    u'line1': u'NYS State Capitol Building',
                                    u'state': u'NY',
                                    u'zip': u'12224'}],
                    u'channels': [ { u'id': u'nygovcuomo',
                                     u'type': u'Twitter'},
                                   { u'id': u'GovernorAndrewCuomo',
                                     u'type': u'Facebook'}],
                    u'name': u'Andrew M. Cuomo',
                    u'party': u'Democratic',
                    u'phones': [u'(518) 474-8390'],
                    u'photoUrl': u'http://www.governor.ny.gov/assets/images/Cuomobio.jpg',
                    u'urls': [u'http://www.governor.ny.gov/']}

      Example of a result:
      {
      "id": 31,
      "name": "Leah Wynn",
      "address1":  "8837 Naper Drive",
      "city": "Eagleville",
      "state": "PA",
      "zip_code": "19415",
      "phones": [ "(610) 301-3175" ],
      "faxes": [],
      "emails": ["leahwynnYaT@teleosaurs.xyz"]
      "role": "representative",
      "party": "Democratic"
    }
    """
    def normalized_contact(self,response, index):
        office = next(office for office in response['offices'] if index in office['officialIndices'])
        role = office['name'] if office else ''
        contact = response['officials'][index]
        default_address = [{
            'line1': '',
            'line2': '',
            'city': '',
            'state': '',
            'zip': '',
        }]
        return {
            "id": index,
            "name": contact.get('name', 'No Name'),
            "address1": contact.get('address', default_address)[0]['line1'],
            "address2": contact.get('address', default_address)[0].get('line2'),
            "city": contact.get('address', default_address)[0]['city'],
            "state": contact.get('address', default_address)[0]['state'],
            "zip_code": contact.get('address', default_address)[0]['zip'],
            "phones": contact.get('phones',[]),
            "faxes": [], # no data from civic api
            "emails": [], # no data from civic api
            "role": role,
            "party": contact.get('party','')
        }
