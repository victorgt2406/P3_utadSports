import { useContext, useEffect, useState } from 'react'
import { CONTEXT } from './utils/Context';
import { PAGES_COMPONENTS } from './routes';
import { router } from './utils/Router';
import { RouterProvider } from 'react-router';
import { useNavigate } from 'react-router-dom';

function App() {
    const context = useContext(CONTEXT);
    const pageComponent = PAGES_COMPONENTS[context.page];
    return (
        <>
            {/* {pageComponent} */}
            <RouterProvider router={router} />
        </>
    )
}

export default App;
