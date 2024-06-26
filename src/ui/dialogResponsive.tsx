import type { ClassValue } from "clsx";
import type * as React from "react";

import useMediaQuery from "@/hooks/screen/useMediaQuery.ts";
import { cn } from "@/lib/utils.ts";
import { Button } from "@/ui/button.tsx";
import { Dialog, DialogContent, DialogTrigger } from "@/ui/dialog.tsx";
import { Drawer, DrawerContent, DrawerTrigger } from "@/ui/drawer.tsx";

type Props = {
	children: React.ReactNode;
	buttonLabel?: string;
	isOpen: boolean;
	setIsOpen: (val: boolean) => void;
	disabledButton?: boolean;
	classNames?: {
		button?: ClassValue[];
	};
};

const DialogResponsive = ({
	children,
	buttonLabel,
	disabledButton,
	classNames,
	isOpen,
	setIsOpen,
}: Props) => {
	const isDesktop = useMediaQuery("(min-width: 768px)");

	if (isDesktop) {
		return (
			<Dialog open={isOpen} onOpenChange={setIsOpen}>
				{buttonLabel && (
					<DialogTrigger asChild>
						<Button
							variant="outline"
							disabled={disabledButton}
							className={cn(classNames?.button)}
						>
							{buttonLabel}
						</Button>
					</DialogTrigger>
				)}
				<DialogContent>{children}</DialogContent>
			</Dialog>
		);
	}
	return (
		<Drawer
			open={isOpen}
			onOpenChange={(props) => {
				if (!(props && isOpen)) {
					setIsOpen(props);
				}
			}}
		>
			{buttonLabel && (
				<DrawerTrigger asChild>
					<Button
						variant="outline"
						disabled={disabledButton}
						className={cn(classNames?.button)}
					>
						{buttonLabel}
					</Button>
				</DrawerTrigger>
			)}

			<DrawerContent className="flex flex-col fixed bottom-0 left-0 right-0 max-h-[96%]">
				<div className="max-w-md w-full mx-auto flex flex-col overflow-auto p-4 rounded-t-[10px]">
					{children}
				</div>
			</DrawerContent>
		</Drawer>
	);
};
export default DialogResponsive;
