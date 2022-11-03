[1mdiff --git a/index.HTML b/index.HTML[m
[1mindex 5d7fa56..649bd91 100644[m
[1m--- a/index.HTML[m
[1m+++ b/index.HTML[m
[36m@@ -181,7 +181,6 @@[m [mAenean id lacus auctor, vehicula turpis a, suscipit est. Fusce tincidunt fringil[m
         </div>[m
       </div>[m
     </div>[m
[31m-[m
     <footer class="text-center text-lg-start bg-light text-muted">[m
       <!-- Section: Social media -->[m
       <section[m
[1mdiff --git a/style.css b/style.css[m
[1mindex d9e38a8..91b084a 100644[m
[1m--- a/style.css[m
[1m+++ b/style.css[m
[36m@@ -1,6 +1,5 @@[m
 @charset "UTF-8";[m
 [m
[31m-[m
 /* HEADER */[m
 [m
 header { [m
[36m@@ -8,10 +7,9 @@[m [mheader {[m
 }[m
 [m
 header > nav {[m
[31m-    margin-top: 20px;[m
     box-shadow: 2px;[m
     border-radius: 5px;[m
[31m-    border: 3px solid #F8F9FA;[m
[32m+[m[32m    border: 3px solid #fff;[m
     width: 800px;[m
     padding: 20px;[m
     margin-left: auto;[m
[36m@@ -33,29 +31,17 @@[m [msection > figure {[m
 /* MAIN CONTENT */[m
 #conteudo{[m
     display: block;[m
[31m-    width: 800px;[m
[32m+[m[32m    width: 750px;[m
     margin-top: 50px;[m
     margin-left: auto;[m
     margin-right: auto;[m
     box-shadow: 2px;[m
     border-radius: 5px;[m
[31m-    border: 3px solid #F8F9FA;[m
[32m+[m[32m    border: 3px solid #fff;[m
     background-color: #F8F9FA;[m
[31m-}[m
 [m
[31m-body > main > div.jumbotron { [m
[31m-    padding: 10px;[m
 }[m
[31m-[m
[31m-/* Footr */ [m
[31m-[m
 footer{[m
[31m-    width: 800px;[m
[31m-    margin-top: 20px;[m
[31m-    margin-left: auto;[m
[31m-    margin-right: auto;[m
[31m-    margin-bottom: 20px;[m
[31m-    border-radius: 5px;[m
[31m-    box-shadow: 2px;[m
[32m+[m[32m    margin-top: 50px;[m
 }[m
 [m
