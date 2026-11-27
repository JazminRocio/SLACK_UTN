import React from 'react'
import useRequest from '../../hooks/useRequest'
import { useEffect } from 'react'
import getAllWorkspaces from '../../services/workspaceService'
import { Link } from 'react-router'
import WorkspaceList from '../../components/WorkspaceList/WorkspaceList.jsx'

function HomeScreen() {
    return (
        <div>
            <h1> Bienvenido a slack!</h1>
            <div>
                <h2>Mis espacios de trabajo:</h2>
                <WorkspaceList />
            </div>


        </div>
    )
}

export default HomeScreen