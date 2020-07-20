import Pandosearch from './pandosearch';
import jquery from 'jquery';

describe('Pandosearch', () => {
    global.window = Object.create(window);
    Object.defineProperty(window, 'location', {
        value: {
            search: '?test1=test-1&test2=test-2',
        },
        writable: true,
    });

    global.nijmegen = Object.create({ SearchResults: jest.fn(), Facets: jest.fn() });

    global.$ = jquery;

    describe('getUrlParameterByName()', () => {
        const pandosearch = new Pandosearch(5);

        describe('It can substract a parameter from the url', () => {
            it.each([
                { parameter: 'test1', expectedValue: 'test-1' },
                { parameter: 'test2', expectedValue: 'test-2' },
                { parameter: 'doesNotExist', expectedValue: '' },
            ])('Dataset: %j', ({ parameter, expectedValue }) => {
                const value = pandosearch.getUrlParameterByName(parameter);
                expect(value).toBe(expectedValue);
            });
        });

        it('It will return an empty string when there is no url query', () => {
            window.location.search = '';

            const value = pandosearch.getUrlParameterByName('test1');
            expect(value).toEqual('');
        });
    });
});
