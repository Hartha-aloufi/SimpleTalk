import React, { useState, useEffect, useRef, useCallback } from 'react';

const useInfinitScroll = (fetchAction: (page: number) => Promise<any>, rootElement) => {
    const [lasElement, setLastElement] = useState<HTMLElement>();
    const [hasMore, setHasMore] = useState(true);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const itemsCountRef = useRef(0);

    const observerCallback = useCallback(() => {
        if (!hasMore)
            return;

        setLoading(true);
        const nextPage = page + 1;

        fetchAction(nextPage).then(({ totalCount, itemsCount }) => {
            itemsCountRef.current += itemsCount;
            
            if (totalCount <= itemsCountRef.current)
                setHasMore(false);

            setLoading(false);
            setPage(nextPage);

        }).catch((e) => {
            // TODO: handle error
            setLoading(false);
            setLastElement(null);
        });

    }, [fetchAction, hasMore, page]);


    /**
     * fetch for the first time
     * TODO: move this to the component
     * or make it configrable
     */
    useEffect(() => {
        observerCallback()
    }, []);
     
    useEffect(() => {
        if(!lasElement)
            return;

        const options = {
            root: rootElement, // if null, it will consider the viewport as root,
            rootMargin: '0px',
            threshold: 1.0
        }

        const observerInstance = new IntersectionObserver((entry) => {
            if(entry[0].isIntersecting)
            observerCallback()
        }, options);


        observerInstance.observe(lasElement);

        return () => {
            observerInstance.disconnect()
        }

    }, [rootElement, observerCallback, lasElement])

    return {
        setLastElement,
        hasMore,
        loading,
        curPage: page,
    }
}

export default useInfinitScroll;