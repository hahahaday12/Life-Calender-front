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
      setUsers(response.data.data.user.name);
    },(error) => {
      alert("system 오류입니다. 문의주세요.", error)
      TokenRepository.removeToken();
    });

    return(
      <>
      <UserName users={users}/>
      </>       
    );
};
export default Usertitle;

