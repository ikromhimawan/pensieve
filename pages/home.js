import React, { useEffect, useMemo, useState } from "react";
import Head from "next/head";
import styles from '../styles/Home.module.css'
import Image from "next/image";
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import { fetchApi } from "../helper/api"
const $ = require('jquery')
import DataTable from "react-data-table-component";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import { encript } from "../helper/function";
import { IsAlert } from "../component/IsAlert";

const Home = () => {
    const router = useRouter()
    const columns = useMemo(
        () => [
            {
                name: "Device ID",
                cell: data => data.device_id,
                sortable: true,
                width: "8rem"
            },
            {
                name: "Device Type",
                cell: data => data.device_type,
                sortable: true
            },
            {
                name: "Latest Timestamp",
                cell: data => data.timestamp,
                sortable: true,
            },
            {
                name: "Latest Location",
                cell: data => data.location,
                width: "7rem"
            },
            {
                cell: row => <Button type='submit' fullWidth={true} variant="outlined" onClick={() => handleViewDetail(row.device_id)}>Detail</Button>,
                width: "10rem"
            }
        ],
        []
    );
    const handleViewDetail = (data) => {
        router.push("/data/" + encript(data))
    }
    useEffect(() => {
        getdata()
        // console.log(getCookie("token"));
    }, [])
    const [data, setData] = useState()
    const getdata = async () => {
        var res = await fetchApi("", "get", true)
        if (res.status == 200) {
            setData(res.data)
        }
        else {
            IsAlert.fire({
                title: "",
                text: res.data.response.message,
                icon: "error",
                showCancelButton: false,
                focusConfirm: false,
                confirmButtonText: 'Go to Login',

            }).then(async function (isConfirm) {
                if (isConfirm.isConfirmed) {
                    router.push('/')
                }
            })
        }
    }
    return (
        <>
            <Head>
                <title>Dashboard - Pensieve</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main className={styles.mainHome}>

                <div className={styles.center}>
                    <Image
                        className={styles.logo}
                        src="/pensieve.svg"
                        alt="Next.js Logo"
                        width={180}
                        height={37}
                        priority
                    />
                </div>
                <Box sx={{ flexGrow: 1 }} >
                    <Grid
                        spacing={2}
                        container
                        direction="row"
                        justifyContent="center"
                        alignItems="center">
                        <Grid item xs={8}>
                            {/* <div className={`${styles.thirteen} ${styles.contentHome}`}>
                                <div className="inset-0" style={{ padding: '20px' }}> */}
                                    {
                                        data && <DataTable
                                            title="GPS Summary"
                                            columns={columns}
                                            data={data}
                                            pagination
                                            className="text-white"
                                        />
                                    }
                                {/* </div>
                            </div> */}
                        </Grid>
                    </Grid>
                </Box>
            </main>
        </>
    )
}
export default Home