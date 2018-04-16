import React from 'react';
import styles from './style.styl';
import ContactBlock from "components/ContactBlock";
import SideNavContent from "components/SideNavContent";

const Contacts = () => (
	<div className={styles.Contacts}>
		<SideNavContent />
		<div className={styles.Contacts__inner}>
			<img src="/map.png" alt=""/>
		</div>
		<ContactBlock />
	</div>
);

export default Contacts;
