export class Schema {
    #groups = new Map();
    #items = [];
    #data;
    constructor(data) {
        this.#data = data;
    }
    get groups() {
        return [...this.#groups.values()];
    }
    getGroup(name) {
        return this.#groups.get(name);
    }
    addGroup(group) {
        if (this.#groups.has(group.name)) {
            throw new Error(`Group with name ${group.name} already added to schema. Group names have to be unique.`);
        }
        this.#groups.set(group.name, group);
        group.schema = this;
    }
    get items() {
        return this.#items;
    }
    addItem(item) {
        this.#items.push(item);
    }
    addItems(items) {
        for (const item of items) {
            this.addItem(item);
        }
    }
    get data() {
        return this.#data;
    }
}
export class Group {
    #name;
    #schema;
    #filters = new Map();
    #data;
    constructor(name, data) {
        this.#name = name;
        this.#data = data;
    }
    get name() {
        return this.#name;
    }
    get schema() {
        return this.#schema;
    }
    set schema(schema) {
        this.#schema = schema;
    }
    get filters() {
        return [...this.#filters.values()];
    }
    getFilter(name) {
        return this.#filters.get(name);
    }
    addFilter(filter) {
        if (this.#filters.has(filter.name)) {
            throw new Error(`Filter with name ${filter.name} already in group ${this.name}. Filter names have to be unique in a Group.`);
        }
        this.#filters.set(filter.name, filter);
        filter.group = this;
    }
    getFilterNames() {
        return [...this.#filters.keys()];
    }
    get data() {
        return this.#data;
    }
}
export class Filter {
    #name;
    #group;
    #data;
    constructor(name, data) {
        this.#name = name;
        this.#data = data;
    }
    get name() {
        return this.#name;
    }
    get group() {
        return this.#group;
    }
    set group(group) {
        this.#group = group;
    }
    get data() {
        return this.#data;
    }
}
export class Item {
    #data;
    #groups = new Map();
    constructor(data) {
        this.#data = data;
    }
    get data() {
        return this.#data;
    }
    getGroupNames() {
        return new Set(this.#groups.keys());
    }
    addFilter(groupName, filterName) {
        const filters = this.#getFiltersFromGroup(groupName);
        filters.add(filterName);
    }
    #getFiltersFromGroup(groupName) {
        if (!this.#groups.has(groupName)) {
            this.#groups.set(groupName, new Set());
        }
        return this.#groups.get(groupName);
    }
    getFilterNames(groupName) {
        if (this.#groups.has(groupName)) {
            return new Set(this.#groups.get(groupName));
        }
        else {
            return new Set();
        }
    }
}
