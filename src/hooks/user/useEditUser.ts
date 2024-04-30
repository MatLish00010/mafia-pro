import { useMutation, useQueryClient } from "@tanstack/react-query";

import { editUser } from "@/requests/user";
import type { DataForm } from "@/routes/Club/Tab/Players/AddEdit";
import type { User } from "@/types/User.ts";
import { useToast } from "@/ui/toast/use-toast.ts";

const useEditUser = (callback?: () => void) => {
	const { toast } = useToast();

	const queryClient = useQueryClient();

	return useMutation({
		mutationKey: ["edit user"],
		mutationFn: (props: DataForm & { id: User["id"] }) => editUser(props),
		onSuccess: (data) => {
			const currentItem = data ? data[0] : undefined;
			if (currentItem) {
				queryClient.setQueryData(
					["users", currentItem.club_id],
					(oldData: (typeof currentItem)[]) => {
						const dataIndex = oldData.findIndex(
							(item) => item.id === currentItem.id,
						);

						if (dataIndex !== -1) {
							const newArr = [...oldData];
							newArr[dataIndex] = currentItem;

							return newArr;
						}

						return oldData;
					},
				);
			}

			toast({
				title: "Player updated",
				description: "Data will automatically updated",
			});
			callback?.();
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

export default useEditUser;
