import {React} from 'react';
import Api from '../../apis/Api';
import { useRecoilState} from 'recoil';
import UserName from '../../CommonLayout/user'
import {userState} from '../../recoil/atoms/user';
import TokenRepository from '../../repository/TokenRepository';


const Usertitle = () => {
  const [users, setUsers] = useRecoilState(userState);
    Api.user()
    .then(response => {
      console.log(response.data)
      setUsers(response.data.data.user.name);
    },(error) => {
      console.log(error)
      TokenRepository.removeToken();
    });

    return(
      <>
      <UserName users={users}/>
      </>       
    );
};
export default Usertitle;

