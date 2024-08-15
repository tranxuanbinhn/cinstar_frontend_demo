export const Person = () => {
    return (<div>
        <div className="person-ctn">
            <div className="person-left">
                <div className="person-name">
                    <h2>Name</h2>
                </div>
                <div className="person-infor">
                    <div className="customer-information"></div>
                    <div className="order-history"></div>
                </div>
            </div>
            <div className="person-right">
                <h1>Thông Tin khách hàng</h1>
                <div className="person-right-change">
                    <h1>Thông tin cá nhân</h1>
                    <form>
                        <div>
                            <span>Ho va ten</span>
                            <input type="text"/>
                        </div>
                        <div>
                            <span>Ho va ten</span>
                            <input type="date"/>
                        </div>
                        <div>
                            <span>Ho va ten</span>
                            <input type="text"/>
                        </div>
                        <div>
                            <span>Ho va ten</span>
                            <input type="text"/>
                        </div>
                        <button>Luu thong tin</button>
                    </form>
                    <form>
                        <h1>Đổi mật khẩu</h1>
                        <div>
                            <div>
                                <span>Mật khẩu cũ</span>
                                <input type="password"/>
                            </div>
                            <div>
                                <span>Mật khẩu cũ</span>
                                <input type="password"/>
                            </div>
                            <div>
                                <span>Mật khẩu cũ</span>
                                <input type="password"/>
                            </div>
                            <button>Đổi mật khẩu</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>);
}