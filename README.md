# Monster Hunter Handler

Integrantes:

  Leonel Boccanfuso (Laboratorio 4, Comisión 3)

  Luciano Serio (Laboratorio 4, Comisión 1)



Al cargar el proyecto, la página iniciará con el contenido del componente 'Home'. Este muestra una breve descripción del proyecto además del nombre de los integrantes, arriba mencionados, y la api de la cual se consume y procesa la información. Estos funcionan como links para páginas externas: el perfil de GitHub de cada integrante, la página con la documentación de la api y la página de la tienda del juego en Steam al que el proyecto está relacionado.

En el encabezado de la página se muestran múltiples opciones: (de izquierda a derecha)

  - El nombre del proyecto: Monster Hunter Handler, que al clickearlo, llevará a la página Home.

  - El botón 'Items', que llevará a un listado con los items consumibles y materiales del juego, con una descripción de estos.  Esta y las demás listas cuentan con una barra de búsqueda que permite mostrar los elementos que tengan con nombre o descripción similar al texto buscado.

  - El botón 'Monsters', que llevará a un listado de las multiples criaturas del juego. A diferencia del listado de items, esta cuenta con un componente filtro, que muestra solamente los monstruos del tipo seleccionado al activar el botón correspondiente. Un componente filtro también está incluído en las listas de armas, armaduras y las relacionadas con el usuario (Wishlist y Adquired).

  - El botón 'Armors', que mostrará el filtro y la barra de búsqueda ya mencionadas y las armaduras del juego con su información básica, como su defensa, resistencia elemental (en forma de la barra de colores [violeta: dragón, naranja: fuego, celeste: hielo, amarillo: electricidad, azul: agua]), la skill que poseen (si poseen alguna), dos imágenes para la vesión masculina y femenina de la armadura (en varios casos, solamente una imágen si las versiones son iguales), un texto en verde 'See details' que lleva a una página con información extra sobre la pieza de armadura, además de el resto de piezas pertenecientes al conjunto, y en caso de que el usuario esté logueado, aparecerán dos botones para agregar la pieza a la lista Wishlist o a la Adquired, mostrando un pop-up con la correcta adición a la lista seleccionada o que el item ya se encuentra en dicha lista.

  - El botón 'Weapons', que tiene funciones similares a la lista de armaduras: como el filtro, la barra de búsqueda, la información mostrada y los botones para agregar el armamento deseado a las listas del usuario.

  > En caso de que el usuario no esté logeado:
    - El botón 'Log In', que llevará a un formulario de logeo pidiendo un nombre de usuario de un usuario existente en la base de datos y su contraseña asociada. Aparecerá un texto en rojo si alguna es incorrecta sobre el botón Log In. Al iniciar sesión correctamente, irá a la página Home.
    
    - El botón 'Register', que llevará a un formulario de registro que pide un nombre de usuario que no exista en la base de datos y una contraseña, ambos de más de 5 caracteres. Al completar el formulario correctamente y clickear el botón Register, se guardará la información en el archivo db.json y la página dirá que el usuario fué correctamente creado y que tiene permitido logearse.

  > En caso de que el usuario esté logueado:
    - El botón 'Wishlist' que mostrará el equipamiento que el usuario agregó de las listas anteriores. Estos muestran, además de la información que se podía ver anteriormente, los materiales necesarios para la forja de dicho item, cada uno con un checkbox asociado que el usuario puede tildar o destildar a voluntad, este cambio persiste en la base de datos. Al tener todos los materiales tildados, aparecerá el botón verde '+ Acquired', que al clickearlo, eliminará el objeto de la lista de pendientes y lo agregará a la lista de adquiridos. Independientemente de esto, también está la opción de borrar diréctamente el objeto de la lista con el botón rojo 'Remove'.
    
    - El botón 'Acquired' que mostrará el equipamiento que el usuario agregó de 'Armors' y 'Weapons', además de los agregados desde la 'Wishlist'. Al igual que en la lista anterior, los objetos pueden ser eliminados con el botón Remove, borrando la información en el json asociada con el usuario. 
    
    - El botón 'Log Out', para cerrar la sesión del usuario actual. 
