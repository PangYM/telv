@echo off
if "%1" == "h" goto begin
mshta vbscript:createobject("wscript.shell").run("%~nx0 h",0)(window.close)&&exit
:begin
start es.bat
ping -n 10 127.0.0.1>nul
start head.bat
ping -n 3 127.0.0.1>nul
start houtai.bat
ping -n 3 127.0.0.1>nul
start nginx.bat
set _taskjava=java.exe
set _taskpython=python.exe
set _tasknginx=nginx.exe

goto checkag

:checkjava
for /f "tokens=5" %%n in ('qprocess.exe ^| find "%_taskjava%" ') do (
 if %%n==%_taskjava% (goto checkpython) else goto startjava
)

:startjava
echo %time% 
echo ********程序java开始启动********
echo 程序重新启动于 %time% ,请检查系统日志 >> restart_service.txt
start es.bat
echo ********程序java启动完成********
goto checkag

:checkpython
for /f "tokens=5" %%n in ('qprocess.exe ^| find "%_taskpython%" ') do (
 if %%n==%_taskpython% (goto checknginx) else goto startpython
)

:startpython
echo %time% 
echo ********程序python开始启动********
echo 程序重新启动于 %time% ,请检查系统日志 >> restart_service.txt
start houtai.bat
echo ********程序python启动完成********
goto checkag


:checknginx
for /f "tokens=5" %%n in ('qprocess.exe ^| find "%_tasknginx%" ') do (
 if %%n==%_tasknginx% (goto checkag) else goto startnginx
)

:startnginx
echo %time% 
echo ********程序nginx开始启动********
echo 程序重新启动于 %time% ,请检查系统日志 >> restart_service.txt
start nginx.bat
echo ********程序nginx启动完成********
goto checkag


:checkag
echo %time% 程序运行正常,60秒后继续检查.. 
ping -n 60 127.0.0.1>nul
goto checkjava
