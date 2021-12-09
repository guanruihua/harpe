import React, { useEffect } from "react";
import { RH } from '../index';
import { openDB } from "../indexDB";

export function TestIndexDB() {
	useEffect(() => {
		console.log({ RH });
		openDB('rh-test')
	}, [1])
	return <div>testIndexDB</div>
}