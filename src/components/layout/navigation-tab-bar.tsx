'use client';

import useNavigationTabBar from '@/src/hooks/use-navigation-tab-bar';
import NewsDialog from '@/src/components/features/news/news-dialog';
import WatchlistDialog from '@/src/components/features/watchlist/watchlist-dialog';
import { Fragment } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/src/components/ui/tabs';
import { Home, Lock } from 'lucide-react';
import { DialogProps } from "@/src/interfaces/global.interface";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/src/components/ui/tooltip';
import { cnvIconStrokeWidth } from '@/src/constants/app.constants';

export default function NavigationTabBar() {
    const {
        scrollEnded, activeTab, onTabClick, dialogType, showDialog, setShowDialog, tabList
    } = useNavigationTabBar();

    return (
        <div
            className={`navigation-tab-bar`}
        >
            <Tabs
                className={`${scrollEnded === true && 'remove-shadow'}`}
                defaultValue={'home'}
                value={activeTab}
            >
                <TabsList>
                    {
                        tabList.map((tab) => {
                            return (
                                <Fragment key={tab.id}>
                                    {
                                        <TabsTrigger
                                            value={tab.value}
                                            disabled={tab.disabled}
                                            onClick={(event) => { onTabClick(event, tab.value) }}
                                            className="px-[7px]"
                                            aria-label={tab.name}
                                        >
                                            {
                                                (tab.name === 'Home') &&
                                                <Home
                                                    className="size-4"
                                                    strokeWidth={cnvIconStrokeWidth}
                                                />
                                            }
                                            {
                                                ((tab.name === 'Watchlist') && tab.disabled) &&
                                                <Tooltip>
                                                    <TooltipTrigger asChild>
                                                        <span aria-hidden="true">
                                                            <Lock
                                                                strokeWidth={cnvIconStrokeWidth}
                                                                className="size-3"
                                                            />
                                                        </span>
                                                    </TooltipTrigger>

                                                    <TooltipContent
                                                        className="!z-100"
                                                    >
                                                        Please sign in to add coins to your watchlist.
                                                    </TooltipContent>
                                                </Tooltip>
                                            }
                                            {(tab.value !== 'home') && tab.name}
                                        </TabsTrigger>
                                    }
                                </Fragment>
                            )
                        })
                    }
                </TabsList>
            </Tabs>

            {(dialogType === 'news') && showNewsDialog({ showDialog, setShowDialog })}
            {(dialogType === 'watchlist') && showWatchlistDialog({ showDialog, setShowDialog })}
        </div>
    )
}

function showWatchlistDialog({ showDialog, setShowDialog }: DialogProps) {
    return (
        <WatchlistDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}

function showNewsDialog({ showDialog, setShowDialog }: DialogProps) {
    return (
        <NewsDialog
            showDialog={showDialog}
            setShowDialog={setShowDialog}
        />
    )
}

