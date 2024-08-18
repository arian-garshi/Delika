import { createShop } from '../Utils/Sanity';
import { useMutation, useQueryClient } from '@tanstack/react-query';

const useShopMutations = () => {
    const queryClient = useQueryClient();

    const useCreateShopMutation = () => {
        return useMutation({
            mutationFn: createShop,
            onError: (error) => {
                console.error('Error creating shop:', error);
            },
            onSuccess: async (result) => {
                console.log('Shop created:', result);
                queryClient.setQueryData(['shopData'], result);
            },
        });
    };

    return {
        useCreateShopMutation,
    };
};

export default useShopMutations;