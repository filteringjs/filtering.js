import { Schema } from './schema';
import { Parser } from './parser';
import { Filtering } from './filtering';
import { Result } from './result';
export declare class FilteringFlow {
    #private;
    static readonly defaultOptions: FilteringFlowOptions;
    constructor(root: HTMLElement, options?: FilteringFlowOptions);
    get options(): FilteringFlowOptions;
    get root(): HTMLElement;
    get schema(): Schema;
    get parser(): Parser;
    get filtering(): Filtering;
    initializeParser(): Parser;
    get parserOptions(): any;
    initializeSchema(): Schema;
    initializeFiltering(): Filtering;
    get filteringOptions(): any;
    initializeFilterListener(): void;
    beforeFilter(filterElement: HTMLElement): boolean;
    filter(): void;
    handleFilterResult(result: Result): void;
}
interface FilteringFlowOptions {
    disabledFilterClass?: string;
    filteredItemClass?: string;
    triggerFilterAfterInitializing?: boolean;
}
export {};
