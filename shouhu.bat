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
echo ********����java��ʼ����********
echo �������������� %time% ,����ϵͳ��־ >> restart_service.txt
start es.bat
echo ********����java�������********
goto checkag

:checkpython
for /f "tokens=5" %%n in ('qprocess.exe ^| find "%_taskpython%" ') do (
 if %%n==%_taskpython% (goto checknginx) else goto startpython
)

:startpython
echo %time% 
echo ********����python��ʼ����********
echo �������������� %time% ,����ϵͳ��־ >> restart_service.txt
start houtai.bat
echo ********����python�������********
goto checkag


:checknginx
for /f "tokens=5" %%n in ('qprocess.exe ^| find "%_tasknginx%" ') do (
 if %%n==%_tasknginx% (goto checkag) else goto startnginx
)

:startnginx
echo %time% 
echo ********����nginx��ʼ����********
echo �������������� %time% ,����ϵͳ��־ >> restart_service.txt
start nginx.bat
echo ********����nginx�������********
goto checkag


:checkag
echo %time% ������������,60���������.. 
ping -n 60 127.0.0.1>nul
goto checkjava
