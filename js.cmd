::mode con: cols=80 lines=15
@echo run bat
set spider_home="<path to this folder>"
java -jar %spider_home%\spider2v.jar %1 -paths=%spider_home%
