import { useMutation, useQueryClient } from "@tanstack/react-query";

import { removeUser } from "@/requests/user";
import type { User } from "@/types/User.ts";
import { useToast } from "@/ui/toast/use-toast.ts";

const useRemoveUser = (callback?: () => void) => {
	const { toast } = useToast();

	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["remove user"],
		mutationFn: (props: User["id"]) => removeUser(props),
		onSuccess: (data) => {
			const currentItem = data ? data[0] : undefined;

			if (currentItem) {
				queryClient.setQueryData(
					["users", currentItem.club_id],
					(oldData: (typeof currentItem)[]) => {
						return oldData.filter((item) => item.id !== currentItem.id);
					},
				);
			}
			toast({
				title: "Player removed",
				description: "Data will automatically updated",
			});

			if (callback) {
				callback();
			}
		},
		onError: (error) => {
			toast({
				title: "Error",
				variant: "destructive",
				description: error.message,
			});
		},
	});
};

export default useRemoveUser;
