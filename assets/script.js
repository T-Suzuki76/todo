'use strict'

window.addEventListener('DOMContentLoaded',()=>{
    // 追加フォームを開く
    let openForm = ()=>{
        const form = document.getElementById('js-form');
        const open = document.getElementById('js-openBtn');
        const close = document.getElementById('js-close');
        const addBtn = document.getElementById('js-add');

        open.addEventListener('click',()=>{form.classList.add('is-open');});
        close.addEventListener('click',()=>{form.classList.remove('is-open');});
        addBtn.addEventListener('click',()=>{form.classList.remove('is-open');});
    }
    let openEditForm = (i)=>{
        const form = document.getElementById('js-editForm');
        const close = document.getElementById('js-closeEdit');
        const addBtn = document.getElementById('js-edit');
        
        form.classList.add('is-open');
        
        close.addEventListener('click',()=>{form.classList.remove('is-open');});
        addBtn.addEventListener('click',()=>{form.classList.remove('is-open');});
        
        // // ローカルからデータを取得してから変換してローカルへ
        let getData = localStorage.getItem('jsons');
        let convertArry = JSON.parse(getData);
        
        const date = document.getElementById('js-editDate');
        date.value = convertArry[i].date
        const text = document.getElementById('js-editText');
        text.value = convertArry[i].task;
        const category = document.getElementById('js-editCategory');
        category.value = convertArry[i].category;
            
        editData(i);
    }
    
    const editData = (i) =>{
        // // ローカルからデータを取得してから変換してローカルへ
        let getData = localStorage.getItem('jsons');
        let convertArry = JSON.parse(getData);

        const editBtn = document.getElementById('js-edit');
        const inputDate = document.getElementById('js-editDate');
        const inputText = document.getElementById('js-editText');
        const inputCategory = document.getElementById('js-editCategory');
        const updateDate = document.querySelectorAll('.p-todo__list__item__day');
        const updateCategory = document.querySelectorAll('.p-todo__list__item__category');
        const updateText = document.querySelectorAll('.p-todo__list__item__text');

        editBtn.addEventListener('click',()=>{
            convertArry[i]={
                date:inputDate.value,
                category:inputCategory.value,
                task:inputText.value
            };

            let arry = JSON.stringify(convertArry);
            localStorage.setItem('jsons',arry);

            updateDate[i].textContent = inputDate.value;
            updateCategory[i].textContent = inputCategory.value;
            updateText[i].textContent = inputText.value;
        })
    }

    const openAddCategory = () =>{
        const btn = document.querySelectorAll("[class$='__form__field__addCategory']");
        const close = document.querySelectorAll("[class$='__form__field__close']");
        const send = document.querySelectorAll("[class$='__form__field__btn']");
        const categoryUd = document.querySelectorAll('.c-addCategory');
        
        const excepttInput = () =>{
            categoryUd.forEach((e)=>e.classList.remove('is-open'));
        }

        btn.forEach((target)=>{
            target.addEventListener('click',()=>{
                categoryUd.forEach((e)=>{e.classList.toggle('is-open');});
            });
        });
        close.forEach((target)=>{target.addEventListener('click',()=>excepttInput());});
        send.forEach((target)=>{target.addEventListener('click',()=>excepttInput());});
    }
    
    const categoryToJSON = ()=>{
        let category = ["仕事","趣味","日常"];
        let categoryArray = JSON.stringify(category);
        localStorage.setItem('category',categoryArray);
    }
    const categorySetting = ()=>{
        const categoryBox = document.getElementById('js-category');
        const categoryBoxEdit = document.getElementById('js-editCategory');
        
        if ("category" in localStorage) {
            let getLocal = localStorage.getItem('category');
            let categoryUd = JSON.parse(getLocal);
            categoryUd.forEach((i)=>{categoryBox.insertAdjacentHTML('beforeend',`<option value="${i}">${i}</option>`)});
            categoryUd.forEach((i)=>{categoryBoxEdit.insertAdjacentHTML('beforeend',`<option value="${i}">${i}</option>`)});
        } else {
            categoryToJSON();
            let getLocal = localStorage.getItem('category');
            let categoryInit = JSON.parse(getLocal);
            categoryInit.forEach((i)=>{categoryBox.insertAdjacentHTML('beforeend',`<option value="${i}">${i}</option>`)});
            categoryInit.forEach((i)=>{categoryBoxEdit.insertAdjacentHTML('beforeend',`<option value="${i}">${i}</option>`)});
        }
    }

    const categoryAdding = () =>{
        const categoryInput = document.querySelectorAll('.c-addCategory__input');
        const categoryBtn = document.querySelectorAll('.c-addCategory__btn');
        const categoryBox = document.getElementById('js-category');
        const categoryList = document.querySelectorAll("[class$='__form__field__categoryList']");
        const categoryBoxEdit = document.getElementById('js-editCategory');
        let getArray = localStorage.getItem('category');
        let category = JSON.parse(getArray);

        Array.from(categoryBtn).map((target)=>{
            target.addEventListener('click',()=>{
                Array.from(categoryInput).map((i)=>{                    
                    if(i.value !==""){
                        category.push(i.value);
                        let toJSON = JSON.stringify(category);
                        localStorage.setItem('category',toJSON);
                        
                        categoryBox.insertAdjacentHTML('beforeend',`<option value="${i.value}">${i.value}</option>`);
                        categoryBoxEdit.insertAdjacentHTML('beforeend',`<option value="${i.value}">${i.value}</option>`);
                        
                        categoryList.forEach((e)=>{
                            e.insertAdjacentHTML('beforeend',`<li><button class="p-todo__add__form__field__categoryList__btn" type="button">${i.value}</button></li>`);
                        });
                        i.value = "";
                    }
                });
            });
        });
    }
    
    const showCategoryBtn = () =>{
        const categoryList = document.querySelectorAll("[class$='__form__field__categoryList']");
        let getArray = localStorage.getItem('category');
        let category = JSON.parse(getArray);
        category.forEach((i)=>{
            categoryList.forEach((target)=>{
                target.insertAdjacentHTML('beforeend',`<li><button class="p-todo__add__form__field__categoryList__btn" type="button">${i}</button></li>`);
            });
        });
    }

    const openCategoryList = () =>{
        const removeBtn = document.querySelectorAll("[class$='__form__field__removeCategory']");
        const categoryList = document.querySelectorAll("[class$='__form__field__categoryList']");
        const close = document.querySelectorAll("[class$='__form__field__close']");
        const send = document.querySelectorAll("[class$='__form__field__btn']");
        
        showCategoryBtn();

        removeBtn.forEach((target)=>{
            target.addEventListener('click',()=>{
                categoryList.forEach((target)=>{target.classList.toggle('is-open')});
                const exceptBtn = () =>{categoryList.forEach((e)=>e.classList.remove('is-open'))}
                close.forEach((target)=>{target.addEventListener('click',()=>exceptBtn())});
                send.forEach((target)=>{target.addEventListener('click',()=>exceptBtn())});
                
                removeCategory();
            });
        });
    }
    
    const removeCategory = (()=>{
        const categoryBtn = document.querySelectorAll("[class$='__form__field__categoryList__btn']");
        let getArray = localStorage.getItem('category');
        let category = JSON.parse(getArray);
        
        categoryBtn.forEach((i)=>{
            i.addEventListener('click',()=>{
                let index = category.findIndex((target)=>target === i.textContent);
                category.splice(index,1);

                const toJSON = JSON.stringify(category);
                localStorage.setItem('category',toJSON);

                i.remove();
            });
        });
    });


    const arryToJSON = ()=>{
        let arry = JSON.stringify([]);
        localStorage.setItem('jsons',arry);
    }
    
    let setFormValue = ()=>{
        const dateValue = document.getElementById('js-date');
        const textValue = document.getElementById('js-text');
        const categoryValue = document.getElementById('js-category');
        const addBtn = document.getElementById('js-add');
        
        addBtn.addEventListener('click',()=>{
            // オブジェクトを作成し、配列に追加
            let task = {
                date: dateValue.value,
                category: categoryValue.value,
                task: textValue.value
            }

            // ローカルからデータを取得してから変換してローカルへ
            let getData = localStorage.getItem('jsons');
            let convertArry = JSON.parse(getData);
            
            convertArry.push(task);
            
            let arry = JSON.stringify(convertArry);
            localStorage.setItem('jsons',arry);
            // フォームをリセット
            document.getElementById('js-form').reset();
            location.reload();
        });  
    }
    
    // // ページが読み込まれたときに保存されているJSON配列からタスクを表示
    let displaySavedObject = ()=>{
        // JSONをオブジェクトに変換
        let getJSON = localStorage.getItem('jsons');
        let parseTask = JSON.parse(getJSON);
        let getCategory = localStorage.getItem('category');
        let category = JSON.parse(getCategory);

        if(parseTask === null){
            arryToJSON();
        }

        if(parseTask !== null){
            for(let i=0;i<parseTask.length;i++){
                // HTMLに要素として追加する
                // タスクの要素を生成
                let newList = document.createElement('li');
                newList.classList.add('p-todo__list__item');
                newList.insertAdjacentHTML('beforeend',`<span class="p-todo__list__item__day">${parseTask[i].date}</span>`);
                
                // カテゴリーのspan要素を生成
                newList.insertAdjacentHTML('beforeend',`<span class="p-todo__list__item__category">${parseTask[i].category}</span>`);
                
                // タスク内容のp要素を生成
                newList.insertAdjacentHTML('beforeend',`<p class="p-todo__list__item__text">${parseTask[i].task}</p>`);
                
                // 編集用のbutton要素を生成
                let newEdit = document.createElement('button');
                newList.appendChild(newEdit);
                let newEditText = document.createTextNode('編集');
                newEdit.appendChild(newEditText);
                newEdit.classList.add('p-todo__list__item__edit');
                newEdit.setAttribute('type','button');
                
                newEdit.addEventListener('click',() => openEditForm(i));

                // 完了用のbutton要素を作成
                newList.insertAdjacentHTML('beforeend',`<button class="p-todo__list__item__check">完了</button>`);
                
                const parentUl = document.getElementById('js-list');
                parentUl.appendChild(newList);
            }
        }
    }
    const deleteTask = ()=>{
        const check = document.querySelectorAll('.p-todo__list__item__check');
        const listItem = document.querySelectorAll('.p-todo__list__item');
        
        let getData = localStorage.getItem('jsons');
        let convertArry = JSON.parse(getData);
        
        for(let i=0;i<listItem.length;i++){
            check[i].addEventListener('click',()=>{
                const confirmModal = document.querySelector('#js-confirm');
                const confirmTrue = document.querySelector('#js-true');
                const confirmFalse = document.querySelector('#js-false');
                confirmModal.classList.add('is-open');

                confirmTrue.addEventListener('click',()=>{
                    listItem[i].remove();
                    convertArry.splice(i,1);
            
                    let arry = JSON.stringify(convertArry);
                    localStorage.setItem('jsons',arry);
                    confirmModal.classList.remove('is-open');
                });
                confirmFalse.addEventListener('click',()=>{
                    confirmModal.classList.remove('is-open');
                });
            });
        }   
    }
    
    openForm();
    openAddCategory();
    categorySetting();
    categoryAdding();
    openCategoryList();
    displaySavedObject();
    setFormValue();
    deleteTask();
});