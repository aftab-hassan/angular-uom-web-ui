/* tslint:disable:no-unused-variable */
import { async } from '@angular/core/testing';

import { InsightApplicationsFilterPipe } from './insightApplications.filter.pipe';

describe('InsightApplicationsFilterPipe', () => {
   const applications = [
        { alias: 'app1', description: 'description1', title: 'title3' },
        { alias: 'alias1', description: 'application for inventory', title: 'title1' },
        { alias: 'alias10', description: 'description10', title: 'title10' }  
  ]; 
  
  let filterPipe;

  beforeEach(() => {
    filterPipe = new InsightApplicationsFilterPipe()
  });

  it('should create the pipe', async(() => {     
    // assert 
    expect(filterPipe).toBeTruthy();
  }));

  it('filters applications by substring', async(() => { 
      // arrange
      const searchText = 'title1';

      // act 
      const result = filterPipe.transform(applications, searchText);
  
      // assert
      expect(result.length).toBe(2);
    }));

    it('filters all fields of applications case-insensitive', async(() => { 
      // arrange
      const searchText = 'APP';

      // act 
      const result = filterPipe.transform(applications, searchText);
  
      // assert
      expect(result.length).toBe(2);
    }));
});