'use client';

import useNavigationTabBar from '@/hooks/use-navigation-tab-bar';
import NewsDialog from '@/components/features/news/news-dialog';
import WatchlistDialog from '@/components/features/watchlist/watchlist-dialog';
import { Fragment } from 'react';
import { Tabs, TabsTrigger, TabsList } from '@/components/ui/tabs';
import { Home, Lock } from 'lucide-react';
import { DialogProps } from "@/interfaces/global.interface";
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { cnvIconStrokeWidth } from '@/constants/app.constants';

export default function NavigationTabBar() {
    const {
        scrollEnded, activeTab, onTabClick, dialogType, showDialog,
        setShowDialog, tabList
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
                                                        className="!z-60"
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

