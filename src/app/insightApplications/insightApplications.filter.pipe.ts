import { Pipe, PipeTransform } from '@angular/core';

import { IInsightApplication } from '../store/insightApplications/insightApplications.models';

@Pipe({
    name: 'insightApplicationsFilterPipe'
})
export class InsightApplicationsFilterPipe implements PipeTransform{
    transform(apps: Array<IInsightApplication>, ...args: string[]): any{
        let pattern = (args[0] || '').toLowerCase();
        if(!apps || !pattern) return apps;
        
        let containsText = (pattern, input) => (input || '').toLowerCase().indexOf(pattern) !== -1; 
        var contains = containsText.bind(null, pattern);

        return apps.filter(o=> 
            contains(o.alias) || contains(o.title) || contains(o.description)
        );
    }   
}