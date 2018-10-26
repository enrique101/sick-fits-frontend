import PleaseSignIn from '../components/PleaseSignIn';
import AccountInfo from '../components/AccountInfo';

const Account = props => (
    <PleaseSignIn>
        <AccountInfo id={props.query.id}></AccountInfo>
    </PleaseSignIn>
);

export default Account;