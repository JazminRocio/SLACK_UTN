import React from 'react'
import useRequest from './useRequest.jsx'
import { useEffect } from 'react'
import getAllWorkspaces from '../services/workspaceService.js'

export default function useWorkspaceList() {
    const { response, error, loading, sendRequest } = useRequest()


    //Con este efecto me aseguro que sendRequest solo ejecute una vez
    useEffect(
        () => {
            sendRequest(
                () => getAllWorkspaces()
            )
        },
        []

    )
    function reloadWorkspaces() {
        sendRequest(
            () => getAllWorkspaces()
        )
    }
    return {
        workspaces_response: response,
        workspaces_error: error,
        workspaces_loading: loading,
        reloadWorkspaces
    }
}
