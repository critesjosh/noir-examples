import { useContext, useMemo } from 'react';
import { MerkleTreeContext } from '../providers/merkleTree.tsx';
import { type Address } from 'viem';

interface UseEligibleAddressesResult {
  eligibleAddresses: string[];
  nonEligibleAddresses: string[];
  isLoading: boolean;
}

export function useEligibleAddresses(addresses: Address[] | undefined): UseEligibleAddressesResult {
  const merkleTree = useContext(MerkleTreeContext);

  return useMemo(() => {
    if (!merkleTree) {
      return {
        eligibleAddresses: [] as `0x${string}`[],
        nonEligibleAddresses: [] as `0x${string}`[],
        isLoading: true,
      };
    }

    const eligibleAddresses = (addresses ?? []).filter(
      address => merkleTree.indexOf(BigInt(address)) !== -1,
    ) as `0x${string}`[];

    const nonEligibleAddresses: string[] = (addresses ?? []).filter(
      address => merkleTree.indexOf(BigInt(address)) === -1,
    );

    return {
      eligibleAddresses,
      nonEligibleAddresses,
      isLoading: false,
    };
  }, [merkleTree, addresses]);
}
