import { useState, useEffect, useRef } from 'react';

export const useFetch = ( url ) => {
    
    const isMounted = useRef(true);
    const [state, setState] = useState({ data: null, loading: true, error: null})

    useEffect( () => {
        return () => {
            console.log('Se desmonta el Hook');
            isMounted.current = false;
        }
    }, []);

    useEffect( () => {

        setState({ data: null, error: null, loading: true });

        fetch( url)
            .then( resp =>  resp.json() )
            .then( data => {

                if ( isMounted.current ) {

                        setState({
                            loading:false,
                            error: null,
                            data
                        });
                    } else {
                        console.log('SetState no se llamó')
                }

            })
            .catch( () => {
                setState({
                    data:null,
                    loading: false,
                    error:'No se pudo carga la info'
                })
            });

    }, [ url ]);

    return state;
}
