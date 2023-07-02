import { useEffect, useState } from "react";

export default function usePromises(promises: Promise<any>[]): any[] | null {
  const [fetchedPromises, setFetchedPromises] = useState<any[] | null>(null);

  useEffect(() => {
    // Don't fetch if there are no files

    if (promises.length === 0) {
      setFetchedPromises([]);
      return;
    }

    const fetchFiles = async () => {
      const result = await Promise.all(promises);
      setFetchedPromises(result);
    };

    fetchFiles();
  }, [promises]);

  return fetchedPromises;
}
