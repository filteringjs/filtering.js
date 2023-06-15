import { Parser } from './parser';
import { Filtering } from './filtering';
export class FilteringFlow {
    #options;
    static defaultOptions = {
        triggerFilterAfterInitializing: true,
        disabledFilterClass: 'disabled',
        filteredItemClass: 'filtered',
    };
    #root;
    #schema;
    #parser;
    #filtering;
    constructor(root, options = {}) {
        this.#root = root;
        this.#options = { ...FilteringFlow.defaultOptions, ...options };
        this.beforeInitializing();
        this.#parser = this.initializeParser();
        this.#schema = this.initializeSchema();
        this.#filtering = this.initializeFiltering();
        this.initializeFilterListener();
        this.afterInitializing();
        if (this.options.triggerFilterAfterInitializing) {
            this.filter();
        }
    }
    get options() {
        return this.#options;
    }
    get root() {
        return this.#root;
    }
    get schema() {
        return this.#schema;
    }
    get parser() {
        return this.#parser;
    }
    get filtering() {
        return this.#filtering;
    }
    beforeInitializing() {
    }
    initializeParser() {
        return new Parser(this.parserOptions);
    }
    get parserOptions() {
        return undefined;
    }
    initializeSchema() {
        return this.parser.parseSchemaFromHtml(this.root);
    }
    initializeFiltering() {
        return new Filtering(this.schema, this.filteringOptions);
    }
    get filteringOptions() {
        return undefined;
    }
    initializeFilterListener() {
        for (const group of this.schema.groups) {
            const groupElement = group.data.element;
            for (const filter of group.filters) {
                const filterElement = filter.data.element;
                filterElement.addEventListener('click', (event) => {
                    event.preventDefault();
                    if (filterElement.classList.contains(this.options.disabledFilterClass)) {
                        // Ignore click if the filter would give 0 results
                        return;
                    }
                    if (this.beforeFilter(filterElement)) {
                        if (filterElement.dataset.filterType === 'all') {
                            this.#uncheckAllFiltersInGroup(group);
                        }
                        else {
                            if (groupElement.dataset.selectType === 'single' && !filterElement.classList.contains(this.parser.options.filterCheckedClass)) {
                                this.#uncheckAllFiltersInGroup(group);
                            }
                            filterElement.classList.toggle(this.parser.options.filterCheckedClass); // Check or uncheck filter
                        }
                        this.filter();
                    }
                });
            }
        }
    }
    #uncheckAllFiltersInGroup(group) {
        for (const filter of group.filters) {
            const filterElement = filter.data.element;
            filterElement.classList.remove(this.parser.options.filterCheckedClass);
        }
    }
    afterInitializing() {
    }
    beforeFilter(filterElement) {
        return true;
    }
    filter(filterData) {
        if (!filterData) {
            // Parse checked filter from HTML
            filterData = this.parser.parseCheckedFilterDataFromHtml(this.root);
        }
        else {
            // Check/uncheck filters using passed argument filterData
            for (const group of this.schema.groups) {
                for (const filter of group.filters) {
                    const filterElement = filter.data.element;
                    filterElement.classList.toggle(this.parser.options.filterCheckedClass, filterData.checkedFilters.get(group.name)?.has(filter.name));
                }
            }
        }
        const result = this.filtering.filter(filterData);
        this.handleFilterResult(result);
        return result;
    }
    handleFilterResult(result) {
        for (const group of result.groups) {
            for (const filter of group.filters) {
                const filterElement = filter.schemaFilter.data.element;
                if (filterElement.dataset.filterType === 'all') {
                    continue;
                }
                // Disable filter if it would give 0 results
                filterElement.classList.toggle(this.options.disabledFilterClass, filter.possibleItems.length === 0);
            }
        }
        for (const item of result.allItems) {
            // Show or hide items
            item.data.element.classList.toggle(this.options.filteredItemClass, !result.filteredItems.includes(item));
        }
        for (const item of this.schema.items) {
            item.data.element.classList.toggle(this.options.filteredItemClass, !result.filteredItems.includes(item) || !result.allItems.includes(item));
        }
    }
}