import { Pipe, PipeTransform } from '@angular/core';

import { IOrganization } from '../store/organization/organization.models';

@Pipe({
    name: 'orgsFilterPipe'
})
export class OrgsFilterPipe implements PipeTransform{
    transform(orgs: Array<IOrganization>, ...args: string[]): any{
        let pattern = (args[0] || '').toLowerCase();
        if(!orgs || !pattern) return orgs;
        
        let containsText = (pattern, input) => (input || '').toLowerCase().indexOf(pattern) !== -1; 
        var contains = containsText.bind(null, pattern);

        return orgs.filter(o=> 
            contains(o.organizationName) || contains(o.location) || contains(o.statusText) || contains(o.contact) 
            || o.tags.some(t=> contains(t.name) || contains(t.value) )
        );
    }   
}