/* tslint:disable:no-unused-variable */
import { async } from '@angular/core/testing';

import { OrgsFilterPipe } from './orgs.filter.pipe';

describe('OrgsFilterPipe', () => {
  const organizations = [
    {
        organizationName: 'community',
        location: 'seattle',
        contact: 'contact1',
        statusText: 'disabled',      
        tags: [{ name: 'tag1', value: 'value1' }, { name: 'tag2', value: 'value2' }] 
    },
    {
        organizationName: 'health ministry',
        location: 'redmond',
        contact: 'john, seattle WA',
        statusText: 'enabled',      
        tags: [{ name: 'account code', value: '1234' }] 
    },
    {
        organizationName: 'healthcare community',
        location: 'seattle, wa',
        contact: 'alice',
        statusText: 'enabled',      
        tags: [ { name: 'account code', value: '7887' }] 
    }]
  
  let filterPipe;

  beforeEach(() => {
    filterPipe = new OrgsFilterPipe()
  });

  it('should create the pipe', async(() => {     
    // assert 
    expect(filterPipe).toBeTruthy();
  }));

  it('filters organizations by substring', async(() => { 
      // arrange
      const searchText = 'health';

      // act 
      const result = filterPipe.transform(organizations, searchText);
  
      // assert
      expect(result.length).toBe(2);
    }));

    it('filters all fields of organizations case-insensitive', async(() => { 
      // arrange
      const searchText = 'seattle';

      // act 
      const result = filterPipe.transform(organizations, searchText);
  
      // assert
      expect(result.length).toBe(3);
    }));
});