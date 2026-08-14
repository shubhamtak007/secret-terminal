'use client';

import { InputGroup, InputGroupAddon, InputGroupInput } from '@/src/components/ui/input-group';
import { Search, X } from 'lucide-react';
import { Button } from '@/src/components/ui/button';
import { columns } from '@/src/components/features/coins/columns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/src/components/ui/select';
import { getRowsPerPageDefaultValue } from '@/src/services/utils.service';
import { coinsTableContextMenuList } from '@/src/constants/app.constants';
import useCoinList from '@/src/hooks/use-coin-list';
import DataTable from '@/src/components/features/coins/data-table';
import CoinDetailsDialog from '@/src/components/features/coin-details/coin-details-dialog';
import type { CoingeckoCrypto } from '@/src/interfaces/coin.interface';

function CoinList() {
    const {
        fetchingCoinList, coinList, rowsPerPage, sortingValue, currentPageNumber, searchValue, showCoinDetailsDialog,
        clickedCoinRef, rowsPerPageListRef, setSearchValue, setCurrentPageNumber, onRowsPerPageChange,
        setSortingValueFromDt, onSearchInputChange, onRowClicked, onContextMenuItemClicked, setShowCoinDetailsDialog
    } = useCoinList();

    return (
        <>
            <div className="coins-sst-container">
                <div className="search-bar place-items-end">
                    <InputGroup className="max-w-xs search-input-group">
                        <InputGroupInput
                            className="!text-[13px]"
                            placeholder="Search Coin Name"
                            value={searchValue}
                            onChange={(event) => { onSearchInputChange(event) }}
                        />

                        <InputGroupAddon>
                            <Search className="size-4" />
                        </InputGroupAddon>

                        <InputGroupAddon
                            className={`clear-btn ${(searchValue && searchValue.length > 0) ? 'block' : 'hidden'}`}
                            align="inline-end"
                            onClick={() => { setSearchValue('') }}
                        >
                            <X />
                        </InputGroupAddon>
                    </InputGroup>
                </div>

                <DataTable<CoingeckoCrypto>
                    list={coinList}
                    columns={columns}
                    contextMenuList={coinsTableContextMenuList}
                    listEmptyMessage={'No coins found.'}
                    fetchingList={fetchingCoinList}
                    currentPageNumber={currentPageNumber}
                    rowsPerPage={rowsPerPage}
                    currentSortingValue={sortingValue}
                    sendSortingValueToParent={setSortingValueFromDt}
                    onRowClicked={onRowClicked}
                    onContextMenuItemClicked={onContextMenuItemClicked}
                />

                <div className="bottom-bar">
                    <div className="rows-per-page-dropdown">
                        <p className="text-sm">Rows per page</p>

                        <Select
                            defaultValue={String(getRowsPerPageDefaultValue())}
                            onValueChange={(value) => { onRowsPerPageChange(value) }}
                            disabled={fetchingCoinList}
                        >
                            <SelectTrigger aria-label="Rows per page">
                                <SelectValue />
                            </SelectTrigger>

                            <SelectContent>
                                {
                                    rowsPerPageListRef.current.map((rowsPerPage) => {
                                        return (
                                            <SelectItem
                                                key={rowsPerPage + '-rows'}
                                                value={String(rowsPerPage)}
                                            >
                                                {rowsPerPage}
                                            </SelectItem>
                                        )
                                    })
                                }
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="pagination-btn-group">
                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="previous button"
                            onClick={() => { setCurrentPageNumber(currentPageNumber - 1) }}
                            disabled={(currentPageNumber === 1 || fetchingCoinList)}
                        >
                            Previous
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            aria-label="close button"
                            onClick={() => { setCurrentPageNumber((prev) => prev + 1) }}
                            disabled={(coinList.length < rowsPerPage || fetchingCoinList)}
                        >
                            Next
                        </Button>
                    </div>
                </div>
            </div>

            <CoinDetailsDialog
                coin={clickedCoinRef.current}
                showDialog={showCoinDetailsDialog}
                setShowDialog={setShowCoinDetailsDialog}
            />
        </>
    )
}

export default CoinList;
