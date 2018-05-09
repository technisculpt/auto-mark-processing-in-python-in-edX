
# auto-mark-processing-in-python-in-edX

uses the skulpt "python in processing IDE" with edXs advanced javascript problem

removed the need for ```from processing import *``` from the first line and ```run()``` from the end. It gets added in javascript

on error, error prints to html instead of javascript alert. (edX advanced javascript problem embeds your html page in a sandboxed iframe which means javascript alerts are suppressed)

to work the html file has to be hosted by a ssl server i.e begin with https://

## dependencies

jquery.min.js

codemirrorepl.js

processing-1.4.1.min.js

skulpt:

-python.js

-skulpt.min.js

-skulpt-stdlib.js



## edX problem template:

Note: automarking algorithm is in the javascript file and returns "correct" to edX, alternatively you can return code to edX and implement automarking in python within the check_function(e,ans):

```
<problem>
    <customresponse cfn="check_function">
        <script type="loncapa/python">
<![CDATA[
import json
def check_function(e, ans):
    """
    "response" is a dictionary that contains two keys, "answer" and
    ""state".

    The value of "answer" is the JSON string that "getGrade" returns.
    The value of "state" is the JSON string that "getState" returns.
    Clicking either "Submit" or "Save" registers the current state.

    response = json.loads(ans)

    # You can use the value of the answer key to grade:
    answer = json.loads(response["answer"])
    return answer == "correct"

    # Or you can use the value of the state key to grade:
    """
    response = json.loads(ans)
    state = json.loads(response["state"])
    return state["selectedChoice"] == "correct"
]]>
        </script>
        <jsinput
            gradefn="JSInputDemo.getGrade"
            get_statefn="JSInputDemo.getState"
            set_statefn="JSInputDemo.setState"
            initial_state='{"default":"def setup():\n\tbackground(0)\n\ttext(\"hello world\",20,50)\n","selectedChoice":"incorrect1"}'
            width="600"
            height="480"
            html_file="https://test.madmaker.com.au/processingjs/autoMark.html"
            title="Dropdown with Dynamic Text"
            sop="false"/>
    </customresponse>
</problem>
```
## additional info:

[Skulpt python in processing example](http://www.skulpt.org/static/proctest.html)

[Skulpt python in processing github](https://github.com/skulpt/skulpt/wiki/Skulpt-Processing)

[Custom grading applications in edX 1](http://edx.readthedocs.io/projects/edx-developer-guide/en/latest/extending_platform/javascript.html)

[Custom grading applications in edX 2](http://edx.readthedocs.io/projects/edx-partner-course-staff/en/latest/exercises_tools/custom_javascript.html)

## preview:

![alt text](
https://challenge.madmaker.com.au/asset-v1:USYD+MM18e+2018+type@asset+block@automarkpics.jpg)

