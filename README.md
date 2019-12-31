这里就先公布一下最优方案吧：先安装cross-env插件，然后通过修改package.json中的命令行，传递进来新的PORT环境变量。本方案最完美，其余方案都是补充的逗逼方案。
全局安装cross-env：
npm install cross-env -g
修改package.json:
"scripts": {
    "start": "cross-env PORT=5000 react-scripts start",
    //...
}

http://localhost:8080/sso/index.html?res=test#
test
A1c3e5g7!


智慧工作接口
http://134.64.116.90:8101/smartservice/get.login?c=msgPushService&m=addMsgInfo

data={
	"appCode": "latnpublic566",
	"appToken": "249586FC39A7A1F2DA319E54AFB699B8F50A9E2C23B837E8DEC46EC34F7109A1B390230EC37E171155E0AC85A7A8869F",
	"pushUserInfo": "['115775']",
	"startType": "100",
	"title": "123",
	"pushType": "1",
	"message": "123456678",
	"isPush": "0",
	"pushContent": "1234qqqqqqqqqqqqqqqqqqqqq",
	"pushTime": "2019-12-13 15:10:10"
}



<?xml version="1.0" encoding="UTF-8"?>
<beans xmlns="http://www.springframework.org/schema/beans"
        xmlns:aop="http://www.springframework.org/schema/aop"
        xmlns:tx="http://www.springframework.org/schema/tx"
        xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
        xmlns:context="http://www.springframework.org/schema/context"
        xmlns:task="http://www.springframework.org/schema/task"
        xsi:schemaLocation="http://www.springframework.org/schema/beans
        http://www.springframework.org/schema/beans/spring-beans-3.0.xsd
        http://www.springframework.org/schema/aop
        http://www.springframework.org/schema/aop/spring-aop-3.0.xsd
        http://www.springframework.org/schema/tx
        http://www.springframework.org/schema/tx/spring-tx-3.0.xsd
        http://www.springframework.org/schema/context
        http://www.springframework.org/schema/context/spring-context-3.0.xsd
        http://www.springframework.org/schema/task
    http://www.springframework.org/schema/task/spring-task-3.0.xsd">

        <!-- 对包中的所有类进行扫描，以完成Bean创建和自动依赖注入的功能 -->

        <aop:aspectj-autoproxy expose-proxy="true"/>
        <bean id="dbcpConnectionProxy" class="com.chinatelecom.udp.core.dataaccess.proxy.DriverConnectionFactoryInject"></bean>

    <bean name="dataSource_platform" class="org.apache.tomcat.jdbc.pool.DataSource">
             <property name="url" value="jdbc:oracle:thin:@134.64.244.5:1524:edp566a" />
        <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver" />
         <property name="username"><value>bdw</value></property>
        <property name="password"><value>bdW_2013</value></property>
                  <property name="testWhileIdle"><value>true</value></property>
                  <property name="validationInterval"><value>60000</value></property>
                  <property name="validationQuery"><value>select 1 from dual</value></property>
                  <property name="testOnBorrow"><value>true</value></property>
                  <property name="initialSize" value="1"/>
                  <property name="maxIdle" value="20"/>
                  <property name="minIdle" value="1"/>
                  <property name="maxActive" value="20"/>
                  <property name="logValidationErrors" value="true"/>
                  <property name="removeAbandoned" value="true"/>
                  <property name="removeAbandonedTimeout" value="120000"/>
                  <property name="logAbandoned" value="true"/>
                  <property name="suspectTimeout" value="30000"/>
    </bean>

   <bean name="jilizhushou" class="org.apache.tomcat.jdbc.pool.DataSource">
             <property name="url" value="jdbc:oracle:thin:@134.64.244.5:1524:edp566a" />
        <property name="driverClassName" value="oracle.jdbc.driver.OracleDriver" />
         <property name="username"><value>bdw</value></property>
        <property name="password"><value>bdW_2013</value></property>
                  <property name="testWhileIdle"><value>true</value></property>
                  <property name="validationInterval"><value>60000</value></property>
                  <property name="validationQuery"><value>select 1 from dual</value></property>
                  <property name="testOnBorrow"><value>true</value></property>
                  <property name="initialSize" value="1"/>
                  <property name="maxIdle" value="20"/>
                  <property name="minIdle" value="1"/>
                  <property name="maxActive" value="20"/>
                  <property name="logValidationErrors" value="true"/>
                  <property name="removeAbandoned" value="true"/>
                  <property name="removeAbandonedTimeout" value="120000"/>
                  <property name="logAbandoned" value="true"/>
                  <property name="suspectTimeout" value="30000"/>
    </bean>



   <!-- 配置连接mysql的test库 -->
   <!-- <bean name="dataSource_platform" class="org.apache.tomcat.jdbc.pool.DataSource">
            <property name="url" value="jdbc:mysql://127.0.0.1:3306/test?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=UTF-8" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="username"><value>root</value></property>
        <property name="password"><value>123456</value></property>
                  <property name="testWhileIdle"><value>true</value></property>
                  <property name="validationInterval"><value>60000</value></property>
                  <property name="validationQuery"><value>select 1</value></property>
                  <property name="testOnBorrow"><value>true</value></property>
                  <property name="initialSize" value="1"/>
                  <property name="maxIdle" value="3"/>
                  <property name="minIdle" value="1"/>
                  <property name="maxActive" value="4"/>
                  <property name="logValidationErrors" value="true"/>
                  <property name="removeAbandoned" value="true"/>
                  <property name="removeAbandonedTimeout" value="120000"/>
                  <property name="logAbandoned" value="true"/>
                  <property name="suspectTimeout" value="30000"/>
    </bean> -->

    <!-- 配置连接mysql的jilizhushou库 -->
     <!-- <bean name="jilizhushou" class="org.apache.tomcat.jdbc.pool.DataSource">
            <property name="url" value="jdbc:mysql://127.0.0.1:3306/jilizhushou?serverTimezone=UTC&amp;useUnicode=true&amp;characterEncoding=UTF-8" />
        <property name="driverClassName" value="com.mysql.jdbc.Driver" />
        <property name="username"><value>root</value></property>
        <property name="password"><value>123456</value></property>
                  <property name="testWhileIdle"><value>true</value></property>
                  <property name="validationInterval"><value>60000</value></property>
                  <property name="validationQuery"><value>select 1</value></property>
                  <property name="testOnBorrow"><value>true</value></property>
                  <property name="initialSize" value="1"/>
                  <property name="maxIdle" value="3"/>
                  <property name="minIdle" value="1"/>
                  <property name="maxActive" value="4"/>
                  <property name="logValidationErrors" value="true"/>
                  <property name="removeAbandoned" value="true"/>
                  <property name="removeAbandonedTimeout" value="120000"/>
                  <property name="logAbandoned" value="true"/>
                  <property name="suspectTimeout" value="30000"/>
    </bean> -->

    <bean id="connectionFactory" class="com.chinatelecom.udp.core.dataaccess.database.ConnectionFactory">
       <property name="DataSource">
           <map>
               <entry key="platform" value-ref="dataSource_platform">   </entry>
               <entry key="jilizhushou" value-ref="jilizhushou">  </entry>
           </map>
       </property>
   </bean>
        <!-- 配置事务管理器 -->
        <tx:annotation-driven/>

        <bean id="transactionManager" class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
                <property name="dataSource" ref="dataSource_platform" />
                <qualifier value="platform"/>
        </bean>

        <aop:config proxy-target-class="true"/>

        <bean id="sqlSessionFactory_oracle" class="org.mybatis.spring.SqlSessionFactoryBean">
                <property name="dataSource" ref="dataSource_platform" />
                <!-- configLocation：用于指定Mybatis的配置文件位置 -->
                <property name="configLocation" value="classpath:/mybatis.xml" />
                <!-- mapper和resultmap配置路径 -->
            <property name="mapperLocations">
                        <list>
                                <value>classpath*:com/chinatelecom/travelassistant/**/dao/*.xml</value>
                        </list>
                </property>
        </bean>
        <!--
        自动扫描和注册Mapper接口basePackage是用来指定Mapper接口文件所在的基包，
        在这个基包或其所有子包下面的Mapper接口都将被搜索到。多个基包之间可以使用逗号或者分号进行分隔
        -->
        <bean id="mapperScannerConfigurer" class="org.mybatis.spring.mapper.MapperScannerConfigurer">
                <property name="basePackage" value="
                com.chinatelecom.travelassistant.**.mapper
                " />
                <property name="sqlSessionFactoryBeanName" value="sqlSessionFactory_oracle" />
        </bean>

        <!-- 配置SqlSessionTemplate -->
        <bean id="sqlSessionTemplate" class="org.mybatis.spring.SqlSessionTemplate" scope="prototype">
                <constructor-arg name="sqlSessionFactory" ref="sqlSessionFactory_oracle" />
        </bean>

        <context:annotation-config/>

        <task:annotation-driven/>
        <!-- 配置用于从服务端更新静态对象的任务等 -->
   <bean id="schedulerFactoryBean" class="org.springframework.scheduling.quartz.SchedulerFactoryBean">
        <property name="quartzProperties">
                        <props>
                                <prop key="org.quartz.threadPool.threadCount">2</prop>
                        </props>
                </property>
        </bean>

   <context:component-scan base-package="com.chinatelecom.platform com.chinatelecom.udp com.chinatelecom.travelassistant">
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemInfo"/>
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemMenuInfo"/>
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemPageInfo"/>
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemPageModuleInfo"/>
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemPageResourceInfo"/>
   <context:exclude-filter type="assignable" expression="com.chinatelecom.udp.core.userrights.SystemRoleInfo"/>
   </context:component-scan>
</beans>



This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
