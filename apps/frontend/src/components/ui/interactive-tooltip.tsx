"use client";

import * as React from "react";

import { useTouchDetector } from "@/contexts/touch-detector.context";

import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";

import { cn } from "@/lib/utils";

type InteractiveTooltipProps = | React.ComponentProps<typeof Tooltip> | React.ComponentProps<typeof Popover>;
type InteractiveTooltipTriggerProps = | React.ComponentProps<typeof TooltipTrigger> | React.ComponentProps<typeof PopoverTrigger>;
type InteractiveTooltipContentProps = | React.ComponentProps<typeof TooltipContent> | React.ComponentProps<typeof PopoverContent>;

function InteractiveTooltip({ children, ...props }: InteractiveTooltipProps) {
    const { isTouch } = useTouchDetector();

    if (isTouch) {
        return (
            <Popover {...props}>
                {children}
            </Popover>
        );
    }

    return (
        <Tooltip {...props}>
            {children}
        </Tooltip>
    );
}

function InteractiveTooltipTrigger({ children, ...props }: InteractiveTooltipTriggerProps) {
    const { isTouch } = useTouchDetector();

    if (isTouch) {
        return (
            <PopoverTrigger
                data-slot="popover-trigger"
                {...props}
            >
                {children}
            </PopoverTrigger>
        );
    }

    return (
        <TooltipTrigger
            data-slot="tooltip-trigger"
            {...props}
        >
            {children}
        </TooltipTrigger>
    );
}

function InteractiveTooltipContent({ className, sideOffset = 0, children, ...props }: InteractiveTooltipContentProps) {
    const { isTouch } = useTouchDetector();

    if (isTouch) {
        return (
            <PopoverContent
                data-slot="popover-content"
                sideOffset={sideOffset}
                className={cn(className)}
                {...props}
            >
                {children}
            </PopoverContent>
        );
    }

    return (
        <TooltipContent
            data-slot="tooltip-content"
            sideOffset={sideOffset}
            className={cn(className)}
            {...props}
        >
            {children}
        </TooltipContent>
    );
}

export {
    InteractiveTooltip,
    InteractiveTooltipTrigger,
    InteractiveTooltipContent,
    TooltipProvider,
};